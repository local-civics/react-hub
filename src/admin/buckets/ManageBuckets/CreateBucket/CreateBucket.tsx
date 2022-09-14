import * as React        from "react"
import {Overlay}         from "../../../../components";
import {stopPropagation} from "../../../../utils/event";
import {withKey}         from "../../../../utils/form";
import {FormDialog}      from "../../../components/Form/FormDialog/FormDialog";
import {FormInput}       from "../../../components/Form/FormInput/FormInput";

const MIN_DISPLAY_NAME_LENGTH = 5

/**
 * CreateBucketProps
 */
export type CreateBucketProps = {
    onSubmit?: (bucket: NewBucket) => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

/**
 * NewBucket
 */
export type NewBucket = {
    displayName: string
    description: string
}

/**
 * CreateBucket
 * @param props
 * @constructor
 */
export const CreateBucket = (props: CreateBucketProps) => {
    const [bucket, setBucket] = React.useState({} as NewBucket)
    const [success, setSuccess] = React.useState(false)

    const submitDisabled = !bucket.displayName || bucket.displayName.length < MIN_DISPLAY_NAME_LENGTH

    const set = (k: string, v: any) => setBucket(withKey(bucket, k, v))
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && bucket.displayName){
            return props.onSubmit(bucket).then(() => setSuccess(true))
        }
    }

    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { success && <FormDialog
            onClose={onFinish}
            title="Bucket created!"
            description="We've received your request to create the bucket. Please allow up to 5 mins. for changes to complete."
        /> }
        { !success && <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold">Create bucket</h1>
            <FormInput
                required
                displayName="Name"
                description="IMPORTANT: You will not be able to change this later."
                textValue={bucket.displayName}
                minLength={MIN_DISPLAY_NAME_LENGTH}
                onTextChange={(v) => set("displayName", v)}
            />

            <FormInput
                type="paragraph"
                displayName="Description"
                textValue={bucket.description}
                onTextChange={(v) => set("description", v)}
            />

            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-indigo-500 hover:bg-indigo-600 px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Create</span>
                    </button>
                </div>
            </div>
        </form> }
    </Overlay>
}
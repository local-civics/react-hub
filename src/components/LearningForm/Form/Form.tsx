import React                     from "react";
import {Button}                  from "../../Button";
import {Icon}                    from "../../Icon";
import {FormItem, FormItemProps} from "../FormItem/FormItem";

/**
 * FormProps
 */
export type FormProps = {
    formId?: string
    headline?: string
    summary?: string
    eta?: string
    imageURL?: string
    reflection?: string
    rating?: number
    items?: FormItemProps[]

    onSubmit?: (reflection: string, rating?: number) => void
}

/**
 * Form
 * @param props
 * @constructor
 */
export const Form = (props: FormProps) => {
    const items = props.items || []
    const [reflection, setReflection] = React.useState(props.reflection||"")
    const [rating, setRating] = React.useState(props.rating)

    const onChange = (responses?: string[]) => {
        if(!responses || responses.length === 0){
            setReflection("")
            return
        }
        setReflection(responses[0])
    }

    const onSubmit = () => {
        if(props.onSubmit){
            props.onSubmit(reflection, rating)
        }
    }


    return <div className="grid grid-cols-1 gap-y-12 bg-gray-100 px-4 pb-12 lg:px-36">
        <div className="grid grid-cols-2 min-h-96 bg-white rounded-b overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 gap-y-6 px-8 py-8 text-slate-600 max-w-md">
                { props.summary && <h2 className="font-semibold text-2xl">{props.headline}</h2> }
                { props.summary && <p className="whitespace-pre-line">{props.summary}</p> }
                { props.eta && <p className="text-sm font-semibold">Estimated Completion Time: {props.eta}</p> }
            </div>
            <img className="h-full w-full object-cover" alt={props.headline} src={props.imageURL} />
        </div>

        <form className="grid grid-cols-1 gap-y-12" onSubmit={onSubmit}>
            {
                items.map((props) => {
                    return <FormItem {...props}/>
                })
            }

            <FormItem
                headline="Almost there, write a short reflection to earn your points!"
                summary="(1-2 sentences)"
                format="question"
                questionType="text"
                onResponseChange={onChange}
                required
                responses={reflection ? [reflection] : undefined}
            />

            <FormItem>
                <Rating rating={rating} setRating={setRating}/>
            </FormItem>

            <div className="w-max m-auto">
                <Button
                    type="submit"
                    color="blue"
                    size="md"
                    spacing="md"
                    border="rounded"
                    theme="dark"
                    text="Submit"
                />
            </div>
        </form>
    </div>
}

const Rating = (props: { rating?: number, setRating?: (rating: number) => void }) => {
    /**
     * Max points for reflection.
     */
    const maxPoints = 5;
    const [confidence, setConfidence] = React.useState(props.rating || -1);
    const buttons = Array.from({ length: maxPoints }, (_, i) => {
        const color = i < confidence ? "text-sky-200" : "text-slate-200";
        return (
            <div key={i} onMouseEnter={() => setConfidence(i + 1)} onMouseLeave={() => setConfidence(props.rating || -1)}>
                <div
                    className={`cursor-pointer h-4 w-4 ${color}`}
                    onClick={() => props.setRating && props.setRating(i + 1)}
                >
                    <Icon name="circle" />
                </div>
            </div>
        );
    });
    const labels = Array.from({ length: maxPoints }, (_, i) => {
        if (i === 0) {
            return (
                <p key={i} className="inline-block text-sm text-monochrome-500">
                    Poor
                </p>
            );
        }

        if (i === maxPoints - 1) {
            return (
                <p key={i} className="inline-block text-sm text-monochrome-500">
                    Amazing
                </p>
            );
        }

        return <p key={i} className="inline-block text-monochrome-500" />;
    });

    React.useEffect(() => {
        if (props.rating && props.rating !== confidence) {
            setConfidence(props.rating);
        }
    }, [props.rating]);

    return (
        <div className="m-auto inline-block py-4">
            <h6 className="font-bold pb-2 mb-4 text-md text-slate-600 font-semibold"> Rate your experience from poor to amazing</h6>
            <div className="w-max m-auto">
                <div className={`ml-5 w-[17.7rem] grid grid-cols-5 justify-self-center items-center gap-7 mb-2`}>{buttons}</div>
                <div className={`ml-5 w-[16.7rem] text-[0.5rem] text-slate-600 grid grid-cols-5 justify-self-center items-center`}>{labels}</div>
            </div>
        </div>
    );
};
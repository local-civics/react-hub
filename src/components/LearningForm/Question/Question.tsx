import { Modal } from "../../Modal/Modal";
import { Icon } from "../../Icon/Icon";
import React from "react";

// Question types
enum QuestionType {
  FreeForm,
  MultipleChoice,
  Image,
}

/**
 * Question props
 */
export type QuestionProps = {
  isLoading?: boolean;
  questionId?: string;
  response?: string;
  headline?: string;
  imageRequired?: boolean;
  freeForm?: boolean;
  options?: string[];
  onClose?: () => void;
  onAnswerChange?: (questionId: string, answer: string, file?: Blob) => void;
};

/**
 * <Quesion />
 * Question component
 * @param props
 * @constructor
 */
export const Question = (props: QuestionProps) => {
  const [imageURL, setImageURL] = React.useState(props.response);
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageURL(reader.result);
        props.onAnswerChange && props.onAnswerChange(props.questionId || "", "", file);
      }
    };
    reader.readAsDataURL(file);
  };

  const questionType = (() => {
    if (props.imageRequired) {
      return QuestionType.Image;
    }

    if (props.freeForm) {
      return QuestionType.FreeForm;
    }

    if (props.options && props.options.length > 0) {
      return QuestionType.MultipleChoice;
    }

    return QuestionType.FreeForm;
  })();

  return (
    <Modal visible transparent isLoading={props.isLoading} onClose={props.onClose}>
      <div className="w-full md:pr-32 shadow-sm">
        <div className="w-full md:w-[36rem] px-8 py-5 grid grid-cols-1 gap-5">
          {props.headline && (
            <div className="flex gap-4">
              <div className="shrink-0 text-green-500 w-8 h-8 -ml-2">
                <Icon name="positive" />
              </div>
              <div className="text-slate-600 font-bold text-lg">
                <span>{props.headline}</span>
              </div>
            </div>
          )}

          <Response {...props} questionType={questionType} imageURL={imageURL} onImageUpload={onImageUpload} />
        </div>
      </div>
    </Modal>
  );
};

/**
 * Response component
 * @param props
 * @constructor
 */
const Response = (
  props: QuestionProps & {
    questionType: number;
    imageURL?: string;
    onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
) => {
  const imageURL = props.imageURL;
  const onImageUpload = props.onImageUpload;
  switch (props.questionType) {
    case QuestionType.FreeForm:
      return (
        <div>
          <textarea
            maxLength={3000}
            onChange={(e) => props.onAnswerChange && props.onAnswerChange(props.questionId || "", e.target.value)}
            defaultValue={props.response}
            className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>
      );
    case QuestionType.MultipleChoice:
      return (
        <fieldset className="grid grid-cols-1 gap-3">
          {props.options?.map((option, i) => (
            <div key={option} className="flex text-slate-700 text-md items-center gap-2">
              <input
                type="radio"
                id={`question-option-${option}`}
                name={option}
                value={option}
                onChange={() => props.onAnswerChange && props.onAnswerChange(props.questionId || "", option)}
                checked={props.response === option}
              />
              <label htmlFor={`question-option-${option}`}>
                <span className="font-bold">{String.fromCharCode(65 + i)}</span>. {option}
              </label>
            </div>
          ))}
        </fieldset>
      );
    case QuestionType.Image:
      return (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3">
            <div className="shrink-0">
              <div
                className={`${
                  imageURL || props.response ? "rounded-full -ml-4 p-2" : "rounded-full bg-gray-100 -ml-3 p-2"
                }`}
              >
                <img
                  className={imageURL || props.response ? "h-8 w-8 object-cover rounded-full" : "h-6 w-6 object-cover"}
                  src={imageURL || props.response || "https://cdn.localcivics.io/hub/camera.png"}
                  alt="Current image answer"
                />
              </div>
            </div>
            <label className="block">
              <span className="sr-only">Choose image photo</span>
              <input
                onChange={onImageUpload}
                name="image"
                type="file"
                className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-violet-50 file:text-violet-700
                                      hover:file:bg-violet-100"
              />
            </label>
          </div>

          <div className="-ml-2">
            <input
              type="url"
              onChange={(e) => props.onAnswerChange && props.onAnswerChange(props.questionId || "", e.target.value)}
              defaultValue={imageURL}
              placeholder="Paste a url or select a file above"
              className="w-full mt-1 block px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>
        </div>
      );
  }
  return null;
};
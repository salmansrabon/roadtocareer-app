import * as React from "react";
import {useRouter} from "next/router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import {Dashboard} from "../../../../components";
import {useGetQuizQuery} from "../../../../state/services";
import {dateCheck} from "../../../../utils";
import {useHookForm} from "mui-react-hook-form-plus";
import {LoginInputBlock, LoginTextArea} from "../../../login";
import {IQuizShape} from "./[...requirements]";
import {UseFormRegister} from "react-hook-form";
import {QuizTypes, TrueFalseAnswer} from "../../../../variables/enums";

const AssignmentPage = () => {
    const router = useRouter()

    const {createOrUpdate: id} = router.query as { createOrUpdate: string }

    const {
        data,
        isLoading: isAssignmentLoading,
    } = useGetQuizQuery(
        {id},
        {
            skip: !id,
        }
    );

    const start = data?.quizStartDate

    const end = data?.quizEndDate

    const isAssignmentActive = dateCheck(start?.toString(), end?.toString(), new Date().toString())

    const questionsMap = JSON.parse(data?.questions ?? "{}") as { [key: string]: IQuizShape }

    const questions = Object.keys(questionsMap).map((key) => {
            return {
                key,
                question: questionsMap[key]
            }
        }
    )

    const {register, handleSubmit} = useHookForm<{ answers: string[] }>({
        defaultValues: {
            answers: [],
        }
    })

    const onSubmit = (data: { answers: string[] }) => {
        // TODO: Send answers to backend

        console.log(data)
    }

    return (
        <LoadingOverlayWrapper active={isAssignmentLoading}>
            <Dashboard>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 select-none'>
                    <h5>Quiz {id}</h5>

                    {
                        !!data && (
                            <>
                                <h6>Title: {data.title}</h6>
                                <p>Description: {data.description}</p>
                                <p>Start: {start?.toString()}</p>
                                <p>End: {end?.toString()}</p>
                                <p>Active: {isAssignmentActive ? "Yes" : "No"}</p>

                                {
                                    isAssignmentActive && (
                                        <div className='space-y-6'>
                                            <h6>Questions</h6>
                                            {
                                                questions?.map((question, index) => {

                                                    const questionObj = question.question

                                                    return (
                                                        <div key={index} className='space-y-6'>
                                                            <p>{index + 1}. {questionObj.question}</p>

                                                            <RenderAnswerField
                                                                index={index}
                                                                question={questionObj}
                                                                register={register}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </>
                        )
                    }

                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Submit</button>
                </form>
            </Dashboard>
        </LoadingOverlayWrapper>
    )
}

export default AssignmentPage

interface AnswerProps {
    register: UseFormRegister<{ answers: string[] }>;
    index: number;
    question: IQuizShape;
}

const RenderAnswerField: React.FC<AnswerProps> = ({
                                                      register,
                                                      index,
                                                      question
                                                  }) => {

    if (question.type === QuizTypes.TrueFalse) {
        return (
            <LoginInputBlock>
                {Object.keys(TrueFalseAnswer).map((key) => (
                    <div key={key}>
                        {TrueFalseAnswer[key]} <input {...register(`answers.${index}`,)} type="radio"
                                                      value={TrueFalseAnswer[key]}/>
                    </div>
                ))}

            </LoginInputBlock>
        )
    }

    if (question.type === QuizTypes.MultipleAnswer) {
        return <>
            {
                question.options?.map((option, index) => (
                    <div className='space-x-2.5' key={index}>
                        <input id={`${index}-${option.value}`} {...register(`answers.${index}`,)} type="checkbox"
                               value={option.value}/>
                        <label htmlFor={`${index}-${option.value}`}>{option.value}</label>
                    </div>
                ))
            }
        </>
    }

    return (
        <LoginInputBlock>
            <LoginTextArea
                id="answer"
                placeholder="Answer"
                className="p-2 dark:text-white"
                {...register(`answers.${index}`)}
            />
        </LoginInputBlock>
    )
}
import React from "react";
import { MilestoneProps } from "../../../components/Milestone/Milestone";

/**
 * The properties for the badge workflow.
 */
export type MilestoneWorkflowProps = {
  children?: React.ReactElement<MilestoneProps> | React.ReactElement<MilestoneProps>[];
};

/**
 * A component for the badge workflow.
 * @param props
 * @constructor
 */
export const MilestoneWorkflow = (props: MilestoneWorkflowProps) => {
  const hasContent = props.children && React.Children.count(props.children) > 0;
  const count = React.Children.count(props.children || []);
  const columns = 3;
  const gridSize = columns * 2;
  return (
    <>
      {!hasContent && (
        <div className="h-full grid justify-items-center content-center h-[21rem]">
          <p className="text-xs text-center align-middle leading-6 font-semibold text-slate-300">
            No content to display.
          </p>
        </div>
      )}
      {hasContent && (
        <div className="grid md:grid-cols-3 gap-3 h-full p-2 overflow-scroll">
          {props.children}
          {count < gridSize &&
            [...Array(gridSize - count).keys()].map((k) => {
              return <div key={`milestone.${k}`} className="bg-gray-100 p-4 shadow-md rounded-md h-40" />;
            })}
        </div>
      )}
    </>
  );
};

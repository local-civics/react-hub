import { Stopwatch, StopwatchProps } from "./Stopwatch";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Stopwatch",
  component: Stopwatch,
};

/**
 * Component storybook template
 */
// eslint-disable-next-line react/react-in-jsx-scope
const Template: Story<StopwatchProps> = (args) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <Stopwatch
    time="22:01:01"
    ctaList={[
      { readOnly: false, ctaLabel: "start" },
      { readOnly: false, ctaLabel: "stop" },
      { readOnly: true, ctaLabel: "reset" },
    ]}
    {...args}
  />
);

/**
 * Component stories
 */
export const Component: Story<StopwatchProps> = Template.bind({});
Component.args = {};
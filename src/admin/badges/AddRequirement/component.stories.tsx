import * as React                              from "react";
import { AddRequirement, AddRequirementProps } from "./AddRequirement";
import { Story }                               from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Badges/AddRequirement",
  component: AddRequirement,
};

/**
 * Component storybook template
 */
const Template: Story<AddRequirementProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <AddRequirement
          {...args}
      />
      <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<AddRequirementProps> = Template.bind({});
Component.args = {};

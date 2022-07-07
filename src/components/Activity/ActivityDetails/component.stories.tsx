import React                                      from "react";
import { ActivityDetails, ActivityDetailsProps } from "./ActivityDetails";
import { Story }                                  from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Activity/ActivityDetails",
  component: ActivityDetails,
};

/**
 * Component storybook template
 */
const Template: Story<ActivityDetailsProps> = (args) => (
  <div className="h-full w-full overscroll-none">
    <ActivityDetails
      xp={250}
      pathway="arts & culture"
      imageURL="https://s.yimg.com/os/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
      headline="A learning experience with a really long headline to demonstrate wrapping"
      summary="A sample summary"
      milestone={true}
      startTime={new Date().toString()}
      address="123 Civic Lane, Brooklyn, NY, 12345"
      link="https://www.localcivics.io"
      skills={["math", "public speaking", "engineering"]}
      {...args}
    />
    <img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<ActivityDetailsProps> = Template.bind({});
Component.args = {};

import { Story } from "@storybook/react";
import { BadgePreview, BadgePreviewProps } from "./BadgePreview";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/BadgePreview",
  component: BadgePreview,
};

/**
 * Component storybook template
 */
const Template: Story<BadgePreviewProps & { status?: string }> = (args) => (
  <BadgePreview
    headline="Onboarding Badge"
    status="done"
    imageURL="https://cdn.localcivics.io/badges/onboarding.png"
    {...args}
  />
);

/**
 * Component view
 */
export const Component: Story<BadgePreviewProps> = Template.bind({});
Component.args = {};
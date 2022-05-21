import React from "react";
import { SearchResult, Modal } from "../../components";
import { LegalAgreement } from "../../components/Onboarding/LegalAgreement/LegalAgreement";
import { CommunitySearch } from "../../components/Onboarding/CommunitySearch/CommunitySearch";
import { RoleSelection } from "../../components/Onboarding/RoleSelection/RoleSelection";
import { Registration } from "../../components/Onboarding/Registration/Registration";
import { ImpactQuiz } from "../../components/Onboarding/ImpactQuiz/ImpactQuiz";
import { Welcome } from "../../components/Onboarding/Welcome/Welcome";

/**
 * OnboardingWorkflowProps
 */
export type OnboardingWorkflowProps = {
  isLoading?: boolean;
  hasOrganization?: boolean;
  hasPersona?: boolean;
  hasRegistration?: boolean;
  hasInterests?: boolean;

  search?: string;
  persona?: string;
  givenName?: string;
  familyName?: string;
  grade?: number;
  impactStatement?: string;
  interests?: string[];
  organizations?: any[];

  onDeclineLegalAgreement?: () => void;
  onOrganizationSearch?: (search: string) => void;
  onJoinOrganization?: (organizationId: string, accessCode?: string) => void;
  onConfigureTenant: (changes: any) => void;
  onFinish?: () => void;
};

/**
 * A component for onboarding flow
 * @param props
 * @constructor
 */
export const OnboardingWorkflow = (props: OnboardingWorkflowProps) => {
  return (
    <Modal isLoading={props.isLoading} plain visible>
      <Delegate {...props} />
    </Modal>
  );
};

/**
 * Delegate component for onboarding
 * @param props
 * @constructor
 */
const Delegate = (props: OnboardingWorkflowProps) => {
  const [agreed, setAgreed] = React.useState(!!props.hasOrganization || props.search !== null);
  const [organization, setOrganization] = React.useState(null as any);
  const [organizationOpen, setOrganizationOpen] = React.useState(!!props.search);

  if (!agreed) {
    return <LegalAgreement onDecline={props.onDeclineLegalAgreement} onAccept={() => setAgreed(true)} />;
  }

  if (!props.hasOrganization) {
    return (
      <CommunitySearch
        {...organization}
        open={organizationOpen}
        value={props.search}
        results={
          props.organizations &&
          props.organizations.map((organization) => {
            return (
              <SearchResult
                key={organization.id}
                title={organization.name}
                onClick={() => {
                  setOrganization(organization);
                  setOrganizationOpen(false);
                }}
              />
            );
          })
        }
        onSearch={props.onOrganizationSearch}
        onJoin={(accessCode) => props.onJoinOrganization && props.onJoinOrganization(organization.name, accessCode)}
        onOpen={() => setOrganizationOpen(true)}
        onClose={() => setOrganizationOpen(false)}
      />
    );
  }

  if (!props.hasPersona) {
    return (
      <RoleSelection
        onStudent={() => props.onConfigureTenant && props.onConfigureTenant({ persona: "student" })}
        onEducator={() => props.onConfigureTenant && props.onConfigureTenant({ persona: "educator" })}
      />
    );
  }

  if (!props.hasRegistration) {
    return (
      <Registration
        persona={props.persona}
        givenName={props.givenName}
        familyName={props.familyName}
        grade={props.grade}
        impactStatement={props.impactStatement}
        onRegister={(registration) => props.onConfigureTenant && props.onConfigureTenant(registration)}
      />
    );
  }

  if (!props.hasInterests) {
    return (
      <ImpactQuiz
        persona={props.persona}
        interests={props.interests}
        onFinish={(interests) => props.onConfigureTenant && props.onConfigureTenant({ interests })}
      />
    );
  }

  return <Welcome givenName={props.givenName} onContinue={props.onFinish} />;
};
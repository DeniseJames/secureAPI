export const createCustomerDiscoveryModel = /* GraphQL */ `
  mutation CreateCustomerDiscoveryModel($input: CreateCustomerDiscoveryModelInput!) {
    createCustomerDiscoveryModel(input: $input) {
          email
          city
          storeName
          additionalFeedback          
          role          
          state
          monthlyLossFromTheft
          merchandiseTheftCategories
          monthlySecuritySpend
          securityImprovements
          roleChallenges
          expensiveTheftTypes
          theftPreventionPlans
          theftPreventionTools
          theftPatterns
          staffTraining
          faceRecognitionEnhancement
    }
  }
`;

export const deleteCustomerDiscoveryModel = /* GraphQL */ `
  mutation DeleteCustomerDiscoveryModel($input: DeleteCustomerDiscoveryModelInput!) {
    deleteCustomerDiscoveryModel(input: $input) {
      email
    }
  }
`;

export const updateCustomerDiscoveryModel = /* GraphQL */ `
  mutation UpdateCustomerDiscoveryModel($input: UpdateCustomerDiscoveryModelInput!) {
    updateCustomerDiscoveryModel(input: $input) {
      email
      monthlyLossFromTheft
      additionalFeedback
      city
      expensiveTheftTypes
      faceRecognitionEnhancement
      merchandiseTheftCategories
      monthlySecuritySpend
      role
      roleChallenges
      securityImprovements
      staffTraining
      state
      storeName
      theftPatterns
      theftPreventionPlans
      theftPreventionTools
      }
  }
`;

export const createContact = /* GraphQL */ `
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      email
      name
      comment
    }
  }
`;

export const deleteContact = /* GraphQL */ `
  mutation DeleteContact($input: DeleteContactInput!) {
    deleteContact(input: $input) {
      email
    }
  }
`;

export const updateContact = /* GraphQL */ `
  mutation UpdateContact($input: UpdateContactInput!) {
    updateContact(input: $input) {
      email
      name
      comment
    }
  }
`;

export const createCustomerDiscovery = /* GraphQL */ `
  mutation CreateCustomerDiscovery($input: CreateCustomerDiscoveryInput!) {
    createCustomerDiscovery(input: $input) {
      email
      additionalFeedback
      storeName
      role
      city
      state
      monthlyLossFromTheft
      merchandiseTheftCategories
      monthlySecuritySpend
      securityImprovements
      roleChallenges
      expensiveTheftTypes
      theftPreventionPlans
      theftPreventionTools
      theftPatterns
      staffTraining
      faceRecognitionEnhancement
    }
  }
`;

export const updateCustomerDiscovery = /* GraphQL */ `
  mutation UpdateCustomerDiscovery($input: UpdateCustomerDiscoveryInput!) {
    updateCustomerDiscovery(input: $input) {
      email
      additionalFeedback
      storeName
      role
      city
      state
      monthlyLossFromTheft
      merchandiseTheftCategories
      monthlySecuritySpend
      securityImprovements
      roleChallenges
      expensiveTheftTypes
      theftPreventionPlans
      theftPreventionTools
      theftPatterns
      staffTraining
      faceRecognitionEnhancement
    }
  }
`;

export const deleteCustomerDiscovery = /* GraphQL */ `
  mutation DeleteCustomerDiscovery($input: DeleteCustomerDiscoveryInput!) {
    deleteCustomerDiscovery(input: $input) {
      email
    }
  }
`;

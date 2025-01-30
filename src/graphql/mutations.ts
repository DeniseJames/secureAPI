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

export const createItem = /* GraphQL */ `
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      description
    }
  }
`;

export const updateItem = /* GraphQL */ `
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
      name
      description
    }
  }
`;

export const deleteItem = /* GraphQL */ `
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
      name
      description
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

export const updateContact = /* GraphQL */ `
  mutation UpdateContact($input: UpdateContactInput!) {
    updateContact(input: $input) {
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

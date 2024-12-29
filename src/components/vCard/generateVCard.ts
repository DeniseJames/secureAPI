// generateVCard.ts
import vCardsJS from 'vcards-js';

export const generateVCard = () => {
  const vCard = vCardsJS();
  vCard.firstName = 'Denise';
  vCard.lastName = 'James, CEO';
  vCard.organization = 'Quantum Computer Learning';
  vCard.workPhone = '510-248-9518';
  vCard.email = 'denisetoo@gmail.com';
  vCard.url = 'https://dataquantumai.com';
  vCard.note = '1623 W Fulton St\nChicago, IL 60612';

  return vCard.getFormattedString();
};

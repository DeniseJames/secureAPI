declare module 'vcards-js' {
    interface VCard {
      firstName: string;
      lastName: string;
      organization: string;
      workPhone: string;
      email: string;
      url: string;
      note: string;
      getFormattedString(): string;
    }
  
    function vCardsJS(): VCard;
  
    export = vCardsJS;
  }
  
export interface PopUpConfig {
  popup: boolean;
  incomeAdd: boolean;
  incomeDistribute: {
    active: boolean;
    opened: boolean;
  };
  incomeEdit: boolean;
  saving: {
    active: boolean;
    opened: boolean;
  };
}

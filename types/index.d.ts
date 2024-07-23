declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
};

declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}
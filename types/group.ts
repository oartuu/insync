export type Group = {
  id: string;
  authorId: string;
  planId: any;
  name: string;
  paymentStatus: any;
  createdAt: string;
  members: Member[];
  events: Event[];
};

type Member = {
  id: string;
  groupId: string;
  userId: string;
  accessLevel: string;
  status: string;
  function: string[];
  user: User;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Event = {
  id: string;
  groupId: string;
  name: string;
  startDate: string;
  location: string;
  setListsStatus: string;
  setlistId: string;
  playlistSpotify: string;
  playlistYoutube: string;
};

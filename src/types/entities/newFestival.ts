

interface NewFestival {
  id: number;
  name: string;
  city: string;
  startDate: string;
  duration: string;
  guestIDs: number[];
}

const initialNewFestival: NewFestival = {
  id: 0, name: '', city: '', startDate: '', duration: '', guestIDs: []
}
const initialNewFestivalWithID: NewFestival = {
  id: 0, name: '', city: '', startDate: '', duration: '', guestIDs: []
}

export {initialNewFestival, initialNewFestivalWithID};
export default NewFestival;



interface newShow {
  id: number;
  name: string;
  duration: string;
  location: string;
  startDate: string;
  startTime: string;
}

const initialnewShow: newShow = {
  id: 0, name: '', duration: '', location: '', startDate: "", startTime: ''
}

export {initialnewShow};
export default newShow;

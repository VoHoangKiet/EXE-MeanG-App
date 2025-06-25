export interface Schedule {
  _id: string;
  description: string;
  location: string;
  start_time: Date;
  end_time: Date;
  user_id: string;
  outfit_id: any;
}
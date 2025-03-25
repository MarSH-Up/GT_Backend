import { UserAccessLevel } from '@prisma/client';

export interface Institution {
  id: string;
  name: string;
  address?: string;
  country?: string;
  createdAt: Date;
  users?: User[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  age?: number;
  gender?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;

  institutionId?: string;
  institution?: Institution;

  userAccessLevel: UserAccessLevel;
  createdBy: string;
  createdAt: Date;
  deletedAt?: Date;
  deletedBy?: string;

  patientProfile?: Patient;
  therapistId?: string;
  sessionsAsTherapist?: Session[];
}

export interface Patient {
  id: string;
  userId: string;
  laterality?: string;
  race?: string;
  socialGroup?: string;
  therapyId?: string;

  user?: User;
  therapy?: Therapy;
  sessions?: Session[];
}

export interface Therapy {
  id: string;
  name?: string;
  patients?: Patient[];
}

export interface Session {
  id: string;
  startTime?: Date;
  endTime?: Date;
  date?: Date;
  patientId: string;
  therapistId?: string;

  patient?: Patient;
  therapist?: User;
  games?: SessionGame[];
}

export interface SessionGame {
  id: string;
  sessionId: string;
  gameName: string;
  playingTime?: number;
  score?: number;

  session?: Session;
}

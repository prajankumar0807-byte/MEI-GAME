export type Role='SUPER_ADMIN'|'STAFF'|'USER'|'PARTICIPANT';
export type QuizStatus='DRAFT'|'PUBLISHED'|'LIVE'|'ENDED'|'ARCHIVED';
export interface User{uid:string;fullName:string;username:string;collegeId?:string;department?:string;year?:string;section?:string;email?:string;phone?:string;profilePhoto?:string;role:Role;isActive:boolean;createdAt?:string;updatedAt?:string;lastLoginAt?:string}
export interface Option{id:string;optionText:string;order:number}
export interface Question{id:string;quizId:string;questionText:string;questionType:'MULTIPLE_CHOICE'|'TRUE_FALSE';points:number;timeLimit:number;explanation?:string;order:number;options:Option[]}
export interface Quiz{ id:string;title:string;description?:string;subject?:string;department?:string;year?:string;difficulty?:string;status:QuizStatus;joinCode?:string;createdBy:string;startTime?:string;endTime?:string;timeLimit?:number;resultVisibility?:string;leaderboardEnabled?:boolean;questionCount?:number;createdAt?:string;updatedAt?:string }

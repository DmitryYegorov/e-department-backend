export interface SetGradeType {
  studentId: string;
  criteriaEvalutationId: string;
  value: number;
  createdBy: string;
  done: boolean;
  comment?: string;
}

export type ManyGradesType = SetGradeType[];

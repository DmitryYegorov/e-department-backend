export interface SetGradeType {
  studentId: string;
  criteriaEvalutationId: string;
  value: number;
  createdBy: string;
}

export type ManyGradesType = SetGradeType[];

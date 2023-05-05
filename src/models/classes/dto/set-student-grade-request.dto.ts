export class GradeItem {
  readonly studentId: string;
  readonly criteriaEvalutationId: string;
  readonly value: number;
}

export class SetStudentGradeRequestDto {
  readonly grades: Array<GradeItem>;
  readonly comment?: string;
  readonly done?: boolean;
}

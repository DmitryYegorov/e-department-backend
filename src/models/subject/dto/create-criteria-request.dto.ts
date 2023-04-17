export class CreateCriteriaRequestDto {
  readonly studyPlanItemId: string;
  readonly criteria: Array<CriteriaItemDto>;
}

export class CriteriaItemDto {
  readonly name: string;
  readonly coefficient: number;
}

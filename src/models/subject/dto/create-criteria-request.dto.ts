export class CreateCriteriaRequestDto {
  readonly studyPlanItemId: string;
  readonly criteria: Array<CriteriaItemDto>;
  readonly topic: string;
  readonly order: number;
  readonly description: string;
}

export class CriteriaItemDto {
  readonly id?: string;
  readonly name: string;
  readonly coefficient: number;
}

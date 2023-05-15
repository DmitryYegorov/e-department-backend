export class CreateStatisticsByGroupDto {
  readonly studyPlanItemIds: Array<string>;
  readonly classId: string;
  readonly comment?: string;
}

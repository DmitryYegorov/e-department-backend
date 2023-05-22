export class CreateStatisticsByGroupDto {
  readonly studyPlanItemIds: Array<string>;
  readonly title: string;
  readonly classId: string;
  readonly comment?: string;
}

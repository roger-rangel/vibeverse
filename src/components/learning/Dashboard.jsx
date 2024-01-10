import QuestsAndBadges from "./QuestsAndBadges";
import CourseAndTournament from "./CourseAndTournament";

export function Dashboard() {

  return (
    <div className="mx-10 pt-6 lg:pt-12">
      <QuestsAndBadges />
      <CourseAndTournament /> 
    </div>
  );
}

import React, { Fragment, lazy } from "react";
import { Switch, Route } from "react-router";
import "./Routers.css"

import DetailStudent from "../components/Student/DetailStudent";
import Parent from "../components/Parent/Parent";
import DetailParent from "../components/Parent/DetailParent";
import Semester from "../components/Semester/Semester";
import Lesson from "../components/Lesson/Lesson";
import Art from "../components/Art/Art";
import Course from "../components/Course/Course";
import Class from "../components/Class/Class";
import DetailClass from "../components/Class/DetailClass";
import DetailLesson from "../components/Class/DetailLesson";
import Turnover from "../components/Turnover/Turnover";
import TeacherRequest from "../components/Request/TeacherRequest";
import RequestConfirmLevel from "../components/Request/RequestConfirmLevel";
import LessonPlan from "../components/Course/LessonPlan";
import Contest from "../components/Contest/Contest";
import DegreePhoto from "../components/Request/DegreePhoto";
import CourseNomalForm from "../components/Course/CourseNomalForm";
import ContestForm from "../components/Contest/ContestForm";
import CourseNomalFormEdit from "../components/Course/CourseNomalFormEdit";
import Account from "../components/Account/Account";
import ChangePassword from "../components/Account/ChangePassword";
import ResultContest from "../components/Contest/ResultContest";
import SectionTemplate from "../components/SectionTemplate/SectionTemplate";
import SectionTemplateForm from "../components/SectionTemplate/SectionTemplateForm";
import TeacherHome from "../components/Home/TeacherHome";
import ScheduleClass from "../components/Class/ScheduleClass";
import CourseTeacher from "../components/Course/CourseTeacher";
import ScheduleTeacher from "../components/Schedule/ScheduleTeacher";
import CourseTeacherDetail from "../components/Course/CourseTeacherDetail";
import TeacherLevel from "../components/TeacherLevel/TeacherLevel";
import TeacherLevelDetail from "../components/TeacherLevel/TeacherLevelDetail";
import ClassTeacher from "../components/Class/ClassTeacher";
import ClassTeacherDetail from "../components/Class/ClassTeacherDetail";
import ContestTeacher from "../components/Contest/ContestTeacher";
import ManageStudent from "../components/ManageStudent/ManageStudent";
import ExerciseStudentList from "../components/ManageStudent/ExerciseStudentList";
import DetailExerciseStudent from "../components/ManageStudent/DetailExerciseStudent";
import DetailClassTeacher from "../components/Class/DetailClassTeacher";
import GradeExamTeacher from "../components/Exam/GradeExamTeacher";
import ResultGradeExamTeacher from "../components/Exam/ResultGradeExamTeacher";
import AnalytisResultGradeExamTeacher from "../components/Exam/AnalytisScoreExamTeacher";
import SectionTeacher from "../components/SectionTeacher/SectionTeacher";
import EditSectionTeacher from "../components/SectionTeacher/EditSectionTeacher";
import ViewSectionTeacher from "../components/SectionTeacher/ViewSectionTeacher";
import RequestTeacher from "../components/RequestTeacher/RequestTeacher";
import ExamTeacher from "../components/Exam/ExamTeacher";
import StudentLeaveDetail from "../components/RequestTeacher/StudentLeaveDetail";
import DetailTeacherRequest from "../components/Request/DetailTeacherRequest";
import TutorialEditRequest from "../components/Request/TutorialEditRequest";
import ContestDetailTeacher from "../components/Contest/ContestDetailTeacher";
import GradeContestTeacher from "../components/Contest/GradeContestTeacher";
import ResultGradeContestTeacher from "../components/Contest/ResultGradeContestTeacher";
import AnalytisResultGradeContestTeacher from "../components/Contest/AnalytisResultGradeContestTeacher";
import DetailContestTeacher from "../components/Contest/DetailContestTeacher";
import NotificationDetail from "../components/Notification/NotificationDetail";
import Notification from "../components/Notification/Notification";
import ParentHome from "../components/Home/ParentHome";
import GuessColor from "../components/GuessColor";
import CourseParent from "../components/Course/CourseParent";
import ContestParent from "../components/Contest/ContestParent";
import ScheduleParent from "../components/Schedule/ScheduleParent";
import CourseStudent from "../components/Course/CourseStudent";
import ScheduleStudent from "../components/Schedule/ScheduleStudent";
import ContestStudent from "../components/Contest/ContestStudent";
import StudentHome from "../components/Home/StudentHome";
import ManageChild from "../components/ManageChild/ManageChild";
import ManageClassesDone from "../components/ManageChild/ManageClassesDone";
import ClassParent from "../components/ClassParent/ClassParent";
import SemesterClassDetail from "../components/Discovery/SemesterClassDetail";
import CartForm from "../components/Discovery/CartForm";
import DetailContestStudent from "../components/ManageStudent/DetailContestStudent";
import Attendance from "../components/SectionTeacher/Attendance";
import ClassStudent from "../components/ClassStudent/ClassStudent";
import DiscoveryStudent from "../components/DiscoveryStudent/Discovery";
import SemesterClassDetailStudent from "../components/DiscoveryStudent/SemesterClassDetail";
import DetailClassStudent from "../components/ClassStudent/DetailClassStudent";
import SectionStudent from "../components/ClassStudent/SectionStudent";
import ViewSectionStudent from "../components/ClassStudent/ViewSectionStudent";
import DetailExerciseStudent1 from "../components/ManageStudent/DetailExerciseStudent1";
import FormSubmit from "../components/ClassStudent/FormSubmit";
import FormSubmitContestStudent from "../components/Contest/FormSubmitContestStudent";
import ScheduleClassStudent from "../components/ClassStudent/ScheduleClassStudent";
import ViewExerciseSubmission from "../components/Exercise/ViewExerciseSubmission";
import SemesterClassStudentNew from "../components/DiscoveryStudent/SemesterClasssStudentNew";
import ReivewClassDone from "../components/ClassStudent/ReviewClassDone";
import ExerciseStudentList1 from "../components/ClassStudent/ExerciseStudentList1";
import ReviewStart from "../components/ClassStudent/ReviewStart";
import SemesterClassParentNew from "../components/Discovery/SemesterClassParentNew";
import SemesterClassTeacherNew from "../components/Course/SemesterClassTeacherNew";
import Header from "../components/LeftMenu/LeftMenu";
import ClassTeacherEndDetail from "../components/ClassTeacher/ClassTeacherEndDetail";
import ManageStudentEnd from "../components/ManageStudent/ManageStudentEnd";
import DiscoveryParent from "../components/Discovery/Discovery";
import DiscoveryParentContest from "../components/Discovery/DiscoveryContest";
import RequestTeacher1 from "../components/RequestTeacher/RequestTeacher1";
import DiscoveryStudentContest from "../components/DiscoveryStudent/Discovery1";
import GradeExamTeacherEle from "../components/Exam/GradeExamTeacherEle";
import ViewExerciseTeacherStudent from "../components/Exam/ViewExerciseTeacherStudent";
import ResultGradeContestStudent from "../components/Contest/ResultGradeContestStudent";
import DetailScoreContestStudent from "../components/Contest/DetailScoreContestStudent";
import DetailContestNotOpenNowStudent from "../components/Contest/DetailContestNotOpenNowStudent";
import ResultGradeContestAdmin from "../components/Contest/ResultGradeContestAdmin";
import ViewContestSubmissionDetail from "../components/Contest/ViewContestSubmissionDetail";
import ViewContestSubmissionAdmin from "../components/Contest/ViewContestSubmissionAdmin";
import ViewDetailTeacherForAdmin from "../components/Teachers/ViewDetailTeacherForAdmin";
import ViewDetailStudentForAdmin from "../components/Student/ViewDetailStudentForAdmin";
import ViewDetailParentForAdmin from "../components/Parent/ViewDetailParentForAdmin";
import ViewSectionTeacherRequest from "../components/Request/ViewSectionTeacherRequest";
import HistoryParent from "../components/Parent/HistoryParent";
import HistoryForParent from "../components/HistoryParent/HistoryParent";
import ResultGradeContestParent from "../components/Contest/ContestGradeContestParent";
import DetailClassParent from "../components/ClassParent/DetailClassParent";
import DetailExerciseParent from "../components/ManageStudent/DetailExerciseParent";
import ViewExerciseSubmissionParent from "../components/Exercise/ViewExerciseSubmissionParent";
import FormSubmitParent from "../components/ClassParent/FormSubmitParent";
import FormSubmitContestParent from "../components/Contest/FormSubmitContestParent";
import DetailContestNotOpenNowParent from "../components/Contest/DetailContestNotOpenNowParent";
import DetailContestNotOpenNowTeacher from "../components/Contest/DetailContestNotOpenNowTeacher";
import EditSectionTeacher1 from "../components/SectionTeacher/EditSectionTeacher1";
import ClassDetail from "../components/Class/ClassDetail";
import ConestDetailParent from "../components/Discovery/ContestDetail";
import ConestDetailStudent from "../components/DiscoveryStudent/ContestDetail";
import EditScoreContestStudent from "../components/Contest/EditScoreContestStudent";
import SectionForParent from "../components/ClassParent/SectionForParent";
import DetailSectionParent from "../components/ClassParent/DetailSectionParent";
import EditSectionTeacherNotApprove from "../components/SectionTeacher/EditSectionTeacherNotApprove";
import FormSubmit2Parent from "../components/ClassParent/FormSubmit2Student";
import FormSubmit1Parent from "../components/ClassParent/FormSubmit1Student";
import SectionTeacherSub from "../components/SectionTeacher/SectionTeacherSub";
import Drawing from "../components/Drawing/Drawing";
import Drawing1 from "../components/Drawing/Drawing1";
import DetailClassEnd from "../components/Class/DetailClasEnd";

//import LeftMenu from "../components/LeftMenu/LeftMenu";
const LeftMenu = lazy(()=> import("../components/LeftMenu/LeftMenu"));
//import TopMenu from "../components/TopMenu/TopMenu";
const TopMenu = lazy(()=> import("../components/TopMenu/TopMenu"));
//import Home from "../components/Home/Home";
const Home = lazy(()=> import("../components/Home/Home"));
//import Teacher from "../components/Teachers/Teacher";
const Teacher = lazy(()=> import("../components/Teachers/Teacher"));
//import DetailTeacher from "../components/Teachers/DetailTeacher";
const DetailTeacher = lazy(()=> import("../components/Teachers/DetailTeacher"));
//import Student from "../components/Student/Student";
const Student = lazy(()=> import("../components/Student/Student"));

const Routers: React.FC = () => {
    var role = localStorage.getItem('role')
    var rolePrivilege:string[] =[]
    var roleUser :string =""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }
    if (roleUser === "TEACHER"){
        return (
            <Fragment>
                <LeftMenu />
                <div id="content-wrapper" className="d-flex flex-column content-wrapper-teacher">
                    <div id="content" className="teacher-content">
                        <TopMenu />
                        <div className="container-fluid">
                            <Switch>
                                <Route path={`/change-password`}><ChangePassword /></Route>
                                <Route path={`/account`}><Account /></Route>
                                <Route path={`/class/detail`}><ClassDetail /></Route>
                                <Route path={`/tutorial-request/detail`}><ViewSectionTeacherRequest /></Route>
                                <Route path={`/class/schedule`}><ScheduleClass /></Route>
                                <Route path={`/contest/score`}><DetailScoreContestStudent /></Route>
                                <Route path={`/contest/edit-score`}><EditScoreContestStudent /></Route>
                                <Route path={`/attendance`}><Attendance /></Route>
                                <Route path={`/student-leave/detail`}><StudentLeaveDetail /></Route>
                                <Route path={`/teacher-level/detail`}><TeacherLevelDetail /></Route>                              
                                <Route path={`/teacher-level`}><TeacherLevel /></Route>
                                <Route path={`/courses/semester-classes`}><SemesterClassTeacherNew /></Route>
                                <Route path={`/semester-class/detail`}><CourseTeacherDetail /></Route>
                                <Route path={`/courses`}><CourseTeacher /></Route>
                                <Route path={`/contests/detail`}><ContestDetailTeacher /></Route>
                                <Route path={`/contests-not-open-now/detail`}><DetailContestNotOpenNowTeacher /></Route>
                                <Route path={`/contests/detail-contest`}><DetailContestTeacher /></Route>
                                <Route path={`/contest/result-grade`}><ResultGradeContestTeacher /></Route>
                                <Route path={`/contest/result-analytis`}><AnalytisResultGradeContestTeacher /></Route>
                                <Route path={`/contest/grade`}><GradeContestTeacher /></Route>
                                <Route path={`/contests`}><ContestTeacher /></Route>
                                <Route path={`/classes/detail-student`}><DetailClassTeacher /></Route>
                                <Route path={`/exercise/grade`}><GradeExamTeacher /></Route>
                                <Route path={`/exercise-grade`}><GradeExamTeacherEle /></Route>
                                <Route path={`/exercise/result-analytis`}><AnalytisResultGradeExamTeacher /></Route>
                                <Route path={`/classes/section`}><SectionTeacher /></Route>
                                <Route path={`/classes/section-sub`}><SectionTeacherSub /></Route>
                                <Route path={`/section/edit`}><EditSectionTeacher /></Route>
                                <Route path={`/section/edit-not-approve`}><EditSectionTeacherNotApprove /></Route>
                                <Route path={`/user-register-tutorial/edit`}><EditSectionTeacher1 /></Route>
                                <Route path={`/section/view`}><ViewSectionTeacher /></Route>
                                <Route path={`/request/student`}><RequestTeacher /></Route>
                                <Route path={`/request/teacher`}><RequestTeacher1 /></Route>
                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                <Route path={`/notification`}><Notification /></Route>
                                <Route path={`/exercise/result-grade`}><ResultGradeExamTeacher /></Route>
                                <Route path={`/exercise/student`}><ViewExerciseTeacherStudent /></Route>
                                <Route path={`/class/exercise-student`}><ExerciseStudentList /></Route>
                                <Route path={`/classes-end/detail`}><ClassTeacherEndDetail /></Route>
                                <Route path={`/classes/detail`}><ClassTeacherDetail /></Route>
                                <Route path={`/classes`}><ClassTeacher /></Route>
                                <Route path={`/schedule-teacher`}><ScheduleTeacher /></Route>
                                <Route path={`/manage-student-end`}><ManageStudentEnd /></Route>
                                <Route path={`/manage-student`}><ManageStudent /></Route>
                                <Route path={`/exercise/detail`}><DetailExerciseStudent1 /></Route>
                                <Route path={`/exercise`}><ExamTeacher /></Route>
                                <Route path="/"><TeacherHome /></Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    else if (roleUser === "PARENT") {
        return (
            <Fragment>
                <LeftMenu />
                <div id="content-wrapper" className="d-flex flex-column content-wrapper-teacher">
                    <div id="content" className="teacher-content">
                        <TopMenu />
                        <div className="container-fluid content-page">
                            <Switch>
                                <Route path={`/teacher-request/detail`}><DetailTeacherRequest /></Route>
                                <Route path={`/change-password`}><ChangePassword /></Route>
                                <Route path={`/account`}><Account /></Route>  
                                <Route path={`/drawing`}><Drawing /></Route>
                                <Route path={`/drawing-1`}><Drawing1 /></Route>
                                <Route path={`/classes/review`}><ReivewClassDone /></Route>
                                <Route path={`/classes/section`}><SectionForParent /></Route>
                                <Route path={`/section/detail`}><DetailSectionParent /></Route>
                                <Route path={`/contests/submit`}><FormSubmitContestParent /></Route>
                                <Route path={`/exercise-parent/submit`}><FormSubmit2Parent /></Route>
                                <Route path={`/exercise-parent/submit1`}><FormSubmit1Parent /></Route>
                                <Route path={`/contest/score`}><DetailScoreContestStudent /></Route>
                                <Route path={`/courses/semester-classes`}><SemesterClassParentNew /></Route>
                                <Route path={`/contests/detail`}><ContestDetailTeacher /></Route>
                                <Route path={`/contests-not-open-now/detail`}><DetailContestNotOpenNowParent /></Route>
                                <Route path={`/contests/detail-contest`}><DetailContestTeacher /></Route>
                                <Route path={`/contest/result-grade`}><ResultGradeContestParent /></Route>
                                <Route path={`/contest/result-analytis`}><AnalytisResultGradeContestTeacher /></Route>
                                <Route path={`/cart`}><CartForm /></Route>
                                <Route path={`/exercise/submit`}><FormSubmitParent /></Route>
                                <Route path={`/history`}><HistoryForParent /></Route>
                                <Route path={`/discover/course`}><DiscoveryParent /></Route>
                                <Route path={`/discover/contest`}><DiscoveryParentContest /></Route>
                                <Route path={`/exercise-submission/view`}><ViewExerciseSubmissionParent /></Route>
                                <Route path={`/class/exercise-student`}><ExerciseStudentList /></Route>
                                <Route path={`/exercise/detail`}><DetailExerciseParent /></Route>
                                <Route path={`/contest/detail`}><DetailContestStudent /></Route>
                                <Route path={`/student/classes-doing`}><DetailClassParent /></Route>
                                <Route path={`/students/detail`}><ManageChild /></Route>    
                                <Route path={`/student/class`}><ManageClassesDone /></Route>                        
                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                <Route path={`/notification`}><Notification /></Route>
                                <Route path={`/semester-class/detail`}><SemesterClassDetail /></Route>
                                <Route path={`/courses`}><CourseParent /></Route>
                                <Route path={`/classes`}><ClassParent /></Route>
                                <Route path={`/contests/register`}><ConestDetailParent /></Route>
                                <Route path={`/contests`}><ContestParent /></Route>
                                <Route path={`/schedules`}><ScheduleParent /></Route>
                                <Route path="/"><ParentHome /></Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    else if (roleUser === "STUDENT"){
        return (
            <Fragment>
                <LeftMenu />
                <div id="content-wrapper" className="d-flex flex-column content-wrapper-teacher">
                    <div id="content" className="teacher-content">
                        <TopMenu />
                        <div className="container-fluid content-page">
                            <Switch>
                                <Route path={`/change-password`}><ChangePassword /></Route>
                                <Route path={`/account`}><Account /></Route>                            
                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                <Route path={`/notification`}><Notification /></Route>
                                <Route path={`/drawing`}><Drawing /></Route>
                                <Route path={`/drawing-1`}><Drawing1 /></Route>
                                <Route path={`/exercise-submission/view`}><ViewExerciseSubmission /></Route>
                                <Route path={`/contests/submit`}><FormSubmitContestStudent /></Route>
                                <Route path={`/contests/detail-contest`}><DetailContestNotOpenNowStudent /></Route>
                                <Route path={`/contest/result-grade`}><ResultGradeContestStudent /></Route>
                                <Route path={`/contest/result-analytis`}><AnalytisResultGradeContestTeacher /></Route>
                                <Route path={`/semester-class/detail`}><SemesterClassDetailStudent /></Route>
                                <Route path={`/classes/section`}><SectionStudent /></Route>
                                <Route path={`/class/exercise-student`}><ExerciseStudentList /></Route>
                                <Route path={`/section/view`}><ViewSectionStudent /></Route>
                                <Route path={`/cart`}><CartForm /></Route>
                                <Route path={`/courses/semester-classes`}><SemesterClassStudentNew /></Route>
                                <Route path={`/courses`}><CourseStudent /></Route>
                                <Route path={`/exercise/detail`}><DetailExerciseParent /></Route>
                                <Route path={`/contest/score`}><DetailScoreContestStudent /></Route>
                                <Route path={`/exercise/score`}><DetailExerciseStudent /></Route>
                                <Route path={`/classes/form-review`}><ReviewStart /></Route>
                                <Route path={`/exercise/submit`}><FormSubmit /></Route>
                                <Route path={`/discover/course`}><DiscoveryStudent /></Route>
                                <Route path={`/discover/contest`}><DiscoveryStudentContest /></Route>
                                <Route path={`/classes/exercise-student`}><ExerciseStudentList1 /></Route>
                                <Route path={`/classes/review`}><ReivewClassDone /></Route>
                                <Route path={`/classes/schedule`}><ScheduleClassStudent /></Route>
                                <Route path={`/classes/detail-student`}><DetailClassStudent /></Route>
                                <Route path={`/contests/register`}><ConestDetailStudent /></Route>
                                <Route path={`/contest/detail`}><DetailContestStudent /></Route>
                                <Route path={`/contests`}><ContestStudent /></Route>
                                <Route path={`/classes`}><ClassStudent /></Route>
                                <Route path={`/schedules`}><ScheduleStudent /></Route>
                                <Route path={`/game/guess-color`}><GuessColor /></Route>
                                <Route path="/"><StudentHome /></Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
                <Header />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopMenu />
                        <div className="container-fluid">
                            <Switch>
                                <Route path={`/teacher-request/detail`}><DetailTeacherRequest /></Route>
                                <Route path={`/change-password`}><ChangePassword /></Route>
                                <Route path={`/account`}><Account /></Route>
                                <Route path={`/section/view`}><ViewSectionTeacher /></Route>
                                <Route path={`/tutorial-request/detail`}><ViewSectionTeacherRequest /></Route>
                                <Route path={`/parents/detail`}><DetailParent /></Route>
                                <Route path={`/contest/score`}><DetailScoreContestStudent /></Route>
                                <Route path={`/contest-submission`}><ViewContestSubmissionAdmin /></Route>
                                <Route path={`/contest/result-grade`}><ResultGradeContestAdmin /></Route>
                                <Route path={`/contest/contest-submission`}><ViewContestSubmissionDetail /></Route>
                                <Route path={`/parents`}><Parent /></Route>
                                <Route path={`/classes-end/detail`}><DetailClassEnd /></Route>
                                <Route path={`/students/detail`}><DetailStudent /></Route>
                                <Route path={`/students`}><Student /></Route>
                                <Route path={`/semesters`}><Semester /></Route>
                                <Route path={`/lessons`}><Lesson /></Route>
                                <Route path={`/arts`}><Art /></Route>
                                <Route path={`/class/lesson`}><DetailLesson /></Route>
                                <Route path={`/class/detail`}><DetailClass /></Route>
                                <Route path={`/class/schedule`}><ScheduleClass /></Route>
                                <Route path={`/class`}><Class /></Route>
                                <Route path={`/section-template/edit`}><SectionTemplateForm /></Route>
                                <Route path={`/courses/section-template`}><SectionTemplate /></Route>
                                <Route path={`/courses/lesson-plan`}><LessonPlan /></Route>
                                <Route path={`/courses/create-course`}><CourseNomalForm /></Route>
                                <Route path={`/courses/edit-course`}><CourseNomalFormEdit /></Route>
                                <Route path={`/courses/:id_course`}><CourseNomalForm /></Route>
                                <Route path={`/courses`}><Course /></Route>
                                <Route path={`/contests/result`}><ResultContest /></Route>
                                <Route path={`/contests/edit-contest`}><ContestForm /></Route>
                                <Route path={`/contests/:id_contest`}><ContestForm /></Route>
                                <Route path={`/contests`}><Contest /></Route>
                                <Route path={`/turnovers`}><Turnover /></Route>
                                <Route path={`/tutorial-edit`}><TutorialEditRequest /></Route>
                                <Route path={`/request-teacher-off`}><TeacherRequest /></Route>
                                <Route path={`/teachers/request-level/degree-photo`}><DegreePhoto /></Route>
                                <Route path={`/teachers/request-level`}><RequestConfirmLevel /></Route>
                                <Route path="/teachers/detail"><DetailTeacher /></Route>
                                <Route path="/teacher/detail"><ViewDetailTeacherForAdmin /></Route>
                                <Route path="/student/detail"><ViewDetailStudentForAdmin /></Route>
                                <Route path="/parent/detail"><ViewDetailParentForAdmin /></Route>
                                <Route path={`/teachers`}><Teacher /></Route>
                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                <Route path={`/notification`}><Notification /></Route>
                                <Route path="/"><Home /></Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Routers;
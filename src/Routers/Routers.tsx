import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
import LeftMenu from "../components/LeftMenu/LeftMenu";
import TopMenu from "../components/TopMenu/TopMenu";
import Users from "../components/Users/Users";
import Products from "../components/Products/Products";
import Orders from "../components/Orders/Orders";
import Home from "../components/Home/Home";
import Notifications from "../common/components/Notification";
import Teacher from "../components/Teachers/Teacher";
import DetailTeacher from "../components/Teachers/DetailTeacher";
import Student from "../components/Student/Student";
import DetailStudent from "../components/Student/DetailStudent";
import Parent from "../components/Parent/Parent";
import DetailParent from "../components/Parent/DetailParent";
import Semester from "../components/Semester/Semester";
import Lesson from "../components/Lesson/Lesson";
import Schedule from "../components/Schedule/Schedule";
import Art from "../components/Art/Art";
import Course from "../components/Course/Course";
import Class from "../components/Class/Class";
import DetailClass from "../components/Class/DetailClass";
import DetailLesson from "../components/Class/DetailLesson";
import Turnover from "../components/Turnover/Turnover";
import StudentRequest from "../components/Request/StudentRequest";
import TeacherRequest from "../components/Request/TeacherRequest";
import RequestConfirmLevel from "../components/Request/RequestConfirmLevel";

const Routers: React.FC = () => {
    return (
        <Fragment>
            <Notifications />
            <LeftMenu />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopMenu />
                    <div className="container-fluid">
                        <Switch>
                            <Route path={`/users`}><Users /></Route>
                            <Route path={`/products`}><Products /></Route>
                            <Route path={`/orders`}><Orders /></Route>
                            <Route path={`/parents/detail`}><DetailParent /></Route>
                            <Route path={`/parents`}><Parent /></Route>
                            <Route path={`/students/detail`}><DetailStudent /></Route>
                            <Route path={`/students`}><Student /></Route>
                            <Route path={`/semesters`}><Semester /></Route>
                            <Route path={`/lessons`}><Lesson /></Route>
                            <Route path={`/arts`}><Art /></Route>
                            <Route path={`/class/lesson`}><DetailLesson /></Route>
                            <Route path={`/class/detail`}><DetailClass /></Route>
                            <Route path={`/class`}><Class /></Route>
                            <Route path={`/schedules`}><Schedule /></Route>
                            <Route path={`/courses`}><Course /></Route>
                            <Route path={`/turnovers`}><Turnover /></Route>
                            <Route path={`/request-student-off`}><StudentRequest /></Route>
                            <Route path={`/request-teacher-off`}><TeacherRequest /></Route>
                            <Route path={`/request-level`}><RequestConfirmLevel /></Route>
                            <Route path="/teachers/detail"><DetailTeacher /></Route>
                            <Route path={`/teachers`}><Teacher /></Route>
                            <Route path="/home"><Home /></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Routers;
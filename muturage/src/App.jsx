import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Hejuru from "./screens/Hejuru";
import { useContext } from "react";
import { Store } from "./store";
import Home from "./pages/home/Home";
import PostScreen from "./screens/PostScreen";
import Njye from "./components/Njye";
import Abashyitsi from "./screens//abashyitsi";
import Ibirego from "./screens/Ibirego";
import Amakuru from "./screens/amakuru";
import Chat from "./screens/chats/Chat";
import Ucyekwa from "./screens/ucyekwa";
import SignIn from "./screens/SignIn";
import RegisterScreen from "./screens/RegisterScreen";
import { ToastContainer } from "react-toastify";
import CreateTaskScreen from "./screens/createTaskScreen";
import CreateCase from "./screens/CreateCase";
import UserCases from "./screens/UserCases";
import RequestAppointment from "./screens/RequestAppointment";
import ApproveAppointment from "./screens/ApproveAppointment";
import ImihigoScreen from "./screens/ImihigoScreen";
import CreateMarket from "./screens/CreateMarket";
import CreateReport from "./screens/CreateReport";
import SupervisorReports from "./screens/report";
import CreateEventForm from "./screens/CreateEventForm";
import CreateAppointment from "./screens/CreateAppointment";
import SingleGoal from "./screens/SingleGoal";
import Ushakishwa from "./screens/Ushakishwa";
import MyVisitor from "./screens/MyVisitor";
import Avuye from "./screens/Avuye";
import Impamvu from "./screens/Impamvu";
import Ubukode from "./screens/Ubukode";
import Contract from "./screens/Contract";
import Umwakiriye from "./screens/Umwakiriye";
import Andikisha from "./screens/Andikisha";
import SingleVisitor from "./screens/SingleVisitor";
import Found from "./screens/Found";
import CaseList from "./screens/CaseList";
import GetSingleCase from "./screens/GetSingleCase";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Hejuru />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post/:id" element={<PostScreen />} />
        <Route exact path="/njye" element={<Njye />} />
        <Route exact path="/abashyitsi" element={<Abashyitsi />} />
        <Route exact path="/report" element={<CreateReport />} />
        <Route exact path="/myreport" element={<SupervisorReports />} />
        <Route exact path="/ushakishwa" element={<Ucyekwa />} />
        <Route exact path="/chat" element={<Ibirego />} />
        <Route exact path="/amasezerano" element={<Contract />} />
        <Route exact path="/impamvu" element={<Impamvu />} />
        <Route exact path="/aturutse" element={<Avuye />} />
        <Route exact path="/umwakiriye" element={<Umwakiriye />} />
        <Route exact path="/amasoko" element={<CreateMarket />} />
        <Route exact path="/umushyitsi" element={<MyVisitor />} />
        <Route exact path="/found" element={<Found />} />
        <Route exact path="/imihigo" element={<ImihigoScreen />} />
        <Route exact path="/imihigo/:id" element={<SingleGoal />} />
        <Route exact path="/umushyitsi/:id" element={<SingleVisitor />} />
        <Route exact path="/inshingano" element={<CreateTaskScreen />} />
        <Route exact path="/ucyekwa" element={<Ushakishwa />} />
        <Route exact path="/gahunda" element={<CreateAppointment />} />
        <Route exact path="/case" element={<CreateCase />} />
        <Route exact path="/case/:id" element={<GetSingleCase />} />
        <Route exact path="/cases" element={<CaseList />} />
        <Route exact path="/appointments" element={<ApproveAppointment />} />
        <Route exact path="/request" element={<RequestAppointment />} />
        <Route exact path="/escalate" element={<UserCases />} />
        <Route exact path="/impushya" element={<CreateEventForm />} />
        <Route exact path="/case" element={<Chat />} />
        <Route exact path="/andikisha" element={<Andikisha />} />
        <Route exact path="/ubukode" element={<Ubukode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

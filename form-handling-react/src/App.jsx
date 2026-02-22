import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Registration</h1>

      <RegistrationForm />

      <hr style={{ margin: "40px 0" }} />

      <FormikForm />
    </div>
  );
}

export default App;
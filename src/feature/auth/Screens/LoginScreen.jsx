import { useForm } from "react-hook-form";
import loginImage from "../../../assets/loging-image.png";
import Input from "../../../Utils/Input";
import Button from "../../../Utils/Button";
import { userLogin } from "../Slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, token, error, role } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empId: "EMP001",
      password: "123456",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    dispatch(userLogin(data));
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-7 bg-white">
      <h1>Logo</h1>
      <div className="w-full flex justify-between items-center">
        <div className="w-[50%]">
          <img className="w-[80%]" src={loginImage} alt="Login" />
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-9 border border-borderColor rounded-md shadow-md w-[450px] flex flex-col gap-4"
          >
            <h2 className="text-xl font-sans font-semibold">Login</h2>
            <Input
              label="Employee ID"
              name="empId"
              register={register}
              errors={errors}
              validation={{
                required: "Employee ID is required",
                minLength: {
                  value: 4,
                  message: "Employee ID must be at least 4 characters",
                },
              }}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
            {error && <p className="text-sm text-red-600 font-sans">{error}</p>}
            <Button
              bgColor="bg-orange"
              textColor="text-white"
              type="submit"
              loading={loading}
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

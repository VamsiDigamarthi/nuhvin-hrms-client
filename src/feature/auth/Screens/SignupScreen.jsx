import { signUpFields } from "../../../constants/Signupfields";
import Input from "../../../Utils/Input";
import { useForm } from "react-hook-form";
import Button from "../../../Utils/Button";
import { useParams } from "react-router-dom";
import InfoModal from "../../../Utils/InfoModal";

const SignupScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  console.log(errors);

  const submitForm = async (formData) => {
    console.log(formData);
  };

  const {} = useParams();

  return (
    <>
      <div className="flex w-full items-center justify-center my-4">
        <span className="font-bold text-xl">LOGO</span>
      </div>
      <div className="h-full my-5 flex justify-center gap-6">
        <div className="">
          <img src="/loging-image.png" className="h-[500px]" alt="AuthBoy" />
        </div>

        <div className="h-full border shadow-lg  p-5 rounded-lg w-[35%]">
          <h1 className="text-2xl text-center my-2 font-bold">Sign Up</h1>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="gap-4 flex flex-col w-full h-full"
          >
            {signUpFields.map((e, index) => (
              <Input
                key={index}
                label={e.label}
                name={e.name}
                type={e.type || "text"}
                register={register}
                errors={errors}
                validation={e.validation}
                readOnly={e.readOnly}
              />
            ))}

            <div className="flex items-center gap-4 my-2">
              <input
                type="checkbox"
                id="agree"
                {...register("agree", {
                  required: {
                    value: true,
                    message: "You must agree to the Terms & Conditions",
                  },
                })}
              />
              <div className="flex flex-col gap-2">
                <p>I agree With Terms & Conditions</p>
                {errors.agree && (
                  <span className="text-red-500">{errors.agree.message}</span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="my-2"
              text={"Continue"}
              bgColor="bg-[#ff6600]"
            />
          </form>
        </div>
      </div>

      {/* <InfoModal /> */}
    </>
  );
};

export default SignupScreen;

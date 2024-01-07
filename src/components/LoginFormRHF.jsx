import clsx from "clsx";
import { useForm } from "react-hook-form";

const TOKEN_KEY = "token";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm();

  async function onSubmit(data) {
    console.log("on Submit", data);

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    const json = await response.json();

    if (!json.token) {
      setError("root", { message: "Datos invalidos", type: "manual" });
      throw new Error("invalidos");
    }

    window.localStorage.setItem(TOKEN_KEY, json.token);
  }

  if (isSubmitSuccessful && !errors.root) {
    return (
      <article
        className={clsx(
          "w-full max-w-[500px]",
          "border border-green-500 rounded",
          "text-white text-2xl",
          "flex flex-col justify-center items-center gap 10",
          "p-10"
        )}
      >
        <h1>BIENVENIDO</h1>
        <p>🥳🎉</p>
      </article>
    );
  }

  return (
    <form
      className={clsx(
        "border border-white/50 p-5 rounded",
        "flex flex-col gap-4",
        "w-full max-w-[500px]"
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={clsx("p-2 rounded bg-white/10 text-white")}
        type="text"
        placeholder="username"
        {...register("username", {
          required: { value: true, message: "Usuario requerido" },
          minLength: { value: 3, message: "Nombre muy corto" },
        })}
      />
      {errors.username && (
        <p className="text-red-400">{errors.username.message}</p>
      )}

      <input
        className={clsx("p-2 rounded bg-white/10 text-white")}
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          minLength: 3,
        })}
      />

      <input
        className={clsx(
          "bg-white text-black",
          "w-full p-2 font-bold cursor-pointer",
          "hover:bg-white/60"
        )}
        type="submit"
        value="Ingresar"
      />

      <p className={clsx("text-red-600", { hidden: !errors.root })}>
        DATOS INVALIDOS
      </p>
    </form>
  );
}

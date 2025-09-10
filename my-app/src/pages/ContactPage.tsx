import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";
import TextArea from "../components/forms/TextArea";
import Button from "../components/Button";

type FormValues = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormValues, string>>;
type Touched = Partial<Record<keyof FormValues, boolean>>;

const initialValues: FormValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (v.fullName.trim().length < 3)
    e.fullName = "Full name must be at least 3 characters.";
  if (v.subject.trim().length < 3)
    e.subject = "Subject must be at least 3 characters.";
  if (!emailRegex.test(v.email.trim()))
    e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10)
    e.message = "Message must be at least 10 characters.";
  return e;
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  const fieldError = (k: keyof FormValues) =>
    touched[k] ? errors[k] : undefined;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
  };

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target as { name: keyof FormValues };
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ fullName: true, subject: true, email: true, message: true });

    if (Object.keys(errs).length) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Message sent! We'll get back to you soon.");
      setValues(initialValues);
      setErrors({});
      setTouched({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <form noValidate onSubmit={onSubmit} className="space-y-5">
        <FormField
          id="fullName"
          label="Full Name"
          error={fieldError("fullName")}
          isRequired
        >
          <TextInput
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Jane Doe"
            error={fieldError("fullName")}
          />
        </FormField>

        <FormField
          id="subject"
          label="Subject"
          error={fieldError("subject")}
          isRequired
        >
          <TextInput
            id="subject"
            name="subject"
            value={values.subject}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="I need help with..."
            error={fieldError("subject")}
          />
        </FormField>

        <FormField
          id="email"
          label="Email"
          error={fieldError("email")}
          isRequired
        >
          <TextInput
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="you@example.com"
            error={fieldError("email")}
          />
        </FormField>

        <FormField
          id="message"
          label="Message"
          error={fieldError("message")}
          isRequired
        >
          <TextArea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Write at least 10 characters..."
            error={fieldError("message")}
          />
        </FormField>

        <div className="pt-2">
          <Button type="submit" loading={submitting}>
            Send message
          </Button>
        </div>
      </form>
    </div>
  );
}

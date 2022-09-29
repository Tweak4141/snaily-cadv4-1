import { useTranslations } from "use-intl";
import { Button } from "components/Button";
import { Modal } from "components/modal/Modal";
import { useModal } from "state/modalState";
import { useNotepad } from "hooks/shared/useNotepad";
import { ModalIds } from "types/ModalIds";
import { DEFAULT_EDITOR_DATA, Editor } from "components/editor/Editor";
import { Form, Formik } from "formik";
import { PersistentForm } from "hooks/shared/usePersistentForm";

export function NotepadModal() {
  const { isOpen, closeModal } = useModal();
  const store = useNotepad();
  const common = useTranslations("Common");

  function handleReset() {
    store.setState({ value: DEFAULT_EDITOR_DATA });
  }

  function handleSubmit(data: { value: any[] }) {
    store.setState({ value: data.value });
    closeModal(ModalIds.Notepad);
  }

  return (
    <Modal
      isOpen={isOpen(ModalIds.Notepad)}
      onClose={() => closeModal(ModalIds.Notepad)}
      title="Notepad"
      className="w-[600px]"
    >
      <Formik
        initialValues={{ value: store.state.value ?? DEFAULT_EDITOR_DATA }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <PersistentForm store={store} />
            <Editor value={values.value} onChange={(value) => setFieldValue("value", value)} />

            <footer className="flex justify-end mt-5">
              <Button type="reset" onClick={handleReset} variant="danger">
                {common("reset")}
              </Button>
              <Button className="ml-2" type="submit">
                {common("save")}
              </Button>
            </footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

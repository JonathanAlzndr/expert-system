export default function FormInput() {
  return (
    <>
      <section className="mt-10 flex h-170 w-160 flex-col rounded-lg bg-white px-7 py-6 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">Sympton Checker</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ducimus.</p>
        <br />
        <form action="" className="flex w-full justify-center gap-12">
          <div className="flex w-full flex-col">
            <Input>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
          </div>
          <div className="flex w-full flex-col">
            <Input>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
          </div>
        </form>
      </section>
    </>
  );
}

function Input({ id, question, children }) {
  return (
    <>
      <label htmlFor={id}>{question}</label>
      <select class="border-primary/20 bg-background-light dark:bg-background-dark dark:border-primary/30 focus:ring-primary focus:border-primary w-full rounded border transition-all">
        <option value="">Pilih opsi</option>
        {children}
      </select>
    </>
  );
}

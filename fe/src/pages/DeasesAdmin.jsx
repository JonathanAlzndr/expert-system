import ButtonGroup from "../components/ButtonGroup";
import Button from "./../components/Button";

export default function DeasesAdmin() {
  function Table() {
    function RowHead({ text }) {
      return <th className="px-6 py-3">{text}</th>;
    }
    function Row({ name, skor }) {
      return (
        <tr className="border-b bg-white font-semibold hover:bg-slate-100 sm:text-sm">
          <td className="px-6 py-3">1</td>
          <td className="px-6 py-3 font-medium text-gray-900">{name}</td>
          <td className="px-6 py-3">{skor}</td>
          <td className="px-6 py-3 text-center">
            <ButtonGroup />
          </td>
        </tr>
      );
    }
    return (
      <>
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-200 text-xs text-gray-700 uppercase">
            <tr>
              <RowHead text="Gejala" />
              <RowHead text="Deskripsi" />
              <RowHead text="Skor" />
              <RowHead text="Aksi" />
            </tr>
          </thead>
          <tbody>
            <Row name={"example"} skor={"8"} />
            <Row name={"example"} skor={"8"} />
            <Row name={"example"} skor={"8"} />
          </tbody>
        </table>
      </>
    );
  }
  return (
    <div className="my-auto mt-20 w-4xl rounded-lg p-6">
      <h1 className="mb-4 text-start text-3xl font-bold">
        Mengelola Penyakit & Gejalanya
      </h1>
      <p className="mb-6 text-start text-gray-600">
        Lorem ipsum dolor sit amet consectetur.
      </p>

      <div className="mb-6 flex items-center justify-between">
        <select className="w-35 rounded-md border bg-white p-2 active:scale-98">
          {/* todo */}
          <option>influenza</option>
          <option>influenza</option>
          <option>influenza</option>
        </select>
        <div className="h-10 w-30">
          <Button text={"Tambah Gejala"} />
        </div>
      </div>

      <Table />
    </div>
  );
}

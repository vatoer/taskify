import { db } from "@/lib/db";

const OrganizationIdPage = () => {
  async function create(formData: FormData) {
    "use server";
    console.log(formData);
    const title = formData.get("title") as string;

    await db.board.create({
      data: {
        title,
      },
    });
  }
  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="enter a boar dtitle"
          className="border-black border p-1"
        />
      </form>
    </div>
  );
};

export default OrganizationIdPage;

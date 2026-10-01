import type { UserData } from "../types/userData";

interface HeaderProps {
  userData: UserData | null;
}

export default function Header({ userData }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <div className="bg-back border border-border-1 rounded-lg flex flex-row h-full w-full">
        <div className="flex flex-col gap-4 max-w-[70%] py-10 px-6">
          <h1 className="text-title text-5xl font-bold selection:bg-selection-black">
            {userData?.name ?? "Marcio Filho"}
          </h1>

          <p className="text-text text-wrap selection:bg-selection-black-medium">
            Desenvolvedor front-end e estudante de Engenharia da Computação
            (UNIUBE), em busca da primeira oportunidade na área.
          </p>
        </div>

        <div className="flex flex-col border-l border-border-2 w-[30%] items-center  justify-between py-4">
          <div className="flex flex-col w-[80%]">
            <span className="font-serif text-text text-sm selection:bg-selection-black-medium">
              local
            </span>
            <span className="text-title font-mono selection:bg-selection-black">
              {userData?.location ?? "Não informado"}
            </span>
          </div>

          <div className="flex flex-col w-[80%]">
            <span className="font-serif text-text text-sm selection:bg-selection-black-medium">
              repositórios públicos
            </span>
            <span className="text-title font-mono selection:bg-selection-black">
              {userData?.public_repos}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-back border border-border-1 rounded-lg flex flex-row w-full">
        <button className="flex flex-1 text-text-2 justify-center hover:bg-text-2/10 transition-colors py-3">
          <a href="https://github.com/MarcioFilhoDev" target="_blank">
            <span className="font-mono">GitHub</span>
          </a>
        </button>

        <button className="flex flex-1 text-text-2 justify-center hover:bg-text-2/10 transition-colors py-3 border-l border-text-2/10">
          <a href="https://www.linkedin.com/in/marciodev/" target="_blank">
            <span className="font-mono">LinkedIn</span>
          </a>
        </button>
      </div>
    </header>
  );
}

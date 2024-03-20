class Lead {
    private thickness: number;
    private hardness: string;
    private size: number;
    
    
    public constructor(thickness: number, hardness: string, size: number) {
        this.thickness= thickness;
        this.hardness= hardness;
        this.size= size;
    }
    public usagePerSheet(): number {
        if (this.hardness === 'HB')
            return 1;
        if (this.hardness === '2B')
            return 2;
        if (this.hardness === '4B')
            return 4;
        if (this.hardness === '6B')
            return 6;
        return 0;
    }
    public toString(): string {
        return `${this.thickness}:${this.hardness}:${this.size}`;
    }

    public getThickness(): number {
        return this.thickness;
    }
    public getSize(): number {
        return this.size;
    }
    public getHardness(): string {
        return this.hardness;
    }
    public setSize(value: number): void {
        this.size = value;
    }
    public setHardness(value: string): void {
        this.hardness = value;
    }
    public setThickness(value: number): void {
        this.thickness = value;
    }
}



class Pencil {
    private thickness: number;
    private tip: Lead | null;

    public constructor(thickness: number) { 
        this.thickness = thickness;
        this.tip = null;
    }
    public hasLead(): boolean {
        if(this.tip === null){
            return false;
        }
        return true;
    }
    public insert(lead: Lead): boolean {
        if (lead.getThickness() !== this.thickness) {
            console.log("fail: calibre incompativel");
            return false;
        }
        if (this.hasLead()) {
            console.log("fail: ja existe grafite");
            return false;
        } 
        this.tip = lead;
        return true;

        
    }

    public remove(): Lead | null {
        if(!this.hasLead()){
            console.log("fail: nao existe grafite");
            return null;
        }
        let aux = this.tip;
        this.tip = null;
        return aux;
    
        

    }

    writePage(): void {
        if(!this.hasLead()){
            console.log("fail: nao existe grafite");
            return;
        }
        if(this.tip!.getSize() <= 10){
            console.log("fail: tamanho insuficiente");
            return;
        }
        let grafiteUsada= this.tip!.usagePerSheet() 
        let novoTamanho = this.tip!.getSize() - grafiteUsada;
        if(novoTamanho < 10){
            console.log("fail: folha incompleta");
            this.tip!.setSize(10);
            return;
        }
        this.tip!.setSize(novoTamanho);
    

    }

    public toString(): string {
        let ponta = this.tip != null ? "[" + this.tip.toString() + "]" : "null";
        return "calibre: " + this.thickness + ", grafite: " + ponta;
    }

}

let _cin_ : string[] = [];
try { _cin_ = require("fs").readFileSync(0).toString().split(/\r?\n/); } catch(e){}
let input = () : string => _cin_.length === 0 ? "" : _cin_.shift()!;
let write = (text: any, end:string="\n")=> process.stdout.write("" + text + end);

function main() {
    let pencil = new Pencil(0);

    while (true) {
        let line = input();
        write("$" + line);
        let args = line.split(" ");

        if      (args[0] === "init")  { pencil = new Pencil(+args[1]);                                    }
        else if (args[0] === "show")  { write(pencil.toString());                                         }
        else if (args[0] === "insert"){ pencil.insert(new Lead(+args[1], args[2], +args[3]));             }
        else if (args[0] === "remove"){ pencil.remove();                                                  }
        else if (args[0] === "write") { pencil.writePage();                                               }
        else if (args[0] === "end")   { break;                                                            }
        else                          { write("fail: comando invalido");                                  }
    }
}

main();



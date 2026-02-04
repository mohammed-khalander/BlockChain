import prompt from "prompt";

const schema = {
    properties:{
        privateKey:{
            message:"Enter Metamask Private Key (Sender)",
            required:true,
            hidden:true
        }
    }
};

export async function promptForKey(){
    prompt.start();
    const result = await prompt.get(schema);
    return result.privateKey;
}

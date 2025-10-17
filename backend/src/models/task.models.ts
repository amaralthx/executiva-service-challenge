import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  titulo: string;
  descricao: string;
  status: "pendente" | "em_andamento" | "concluída";
  data_criacao: Date;
  data_conclusao?: Date;
  userId: string;
}

const TaskSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  status: { type: String, enum: ["pendente", "em_andamento", "concluída"], default: "pendente" },
  data_criacao: { type: Date, default: Date.now },
  data_conclusao: { type: Date },
  userId: { type: String, required: true }
});

export default mongoose.model<ITask>("Task", TaskSchema);
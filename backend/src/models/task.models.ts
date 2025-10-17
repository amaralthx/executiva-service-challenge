import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pendente' | 'em andamento' | 'concluída';
  data_criacao: Date;
  user: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: [true, "Título é obrigatório"],
    trim: true
  },
  description: { 
    type: String, 
    default: "",
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['pendente', 'em andamento', 'concluída'],
    default: 'pendente'
  },
  data_criacao: { 
    type: Date, 
    default: Date.now 
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true 
});

export default mongoose.model<ITask>("Task", TaskSchema);

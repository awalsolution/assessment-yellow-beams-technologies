import { model, Schema, Document } from 'mongoose';
import { Campaign } from '@/src/interfaces/campaign';

const CampaignSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    objective: {
      type: String,
      required: [true, 'Objective is required'],
    },
    budget: {
      type: String,
      required: [true, 'Budget is required'],
    },
    target_audience: {
      type: String,
      required: [true, 'Target Audience is required'],
    },
    ai_suggestions: {
      type: String,
      required: [true, 'Target Audience is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const CampaignModel = model<Campaign & Document>('campaigns', CampaignSchema);

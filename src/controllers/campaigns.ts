import { NextFunction, Request, Response } from 'express';
import { Campaign } from '@/src/interfaces/campaign';
import { CampaignService } from '@/src/services/campaign';
import openai from '@/src/config/openai';

export class CampaignsController {
  private campaignService: CampaignService;

  constructor() {
    this.campaignService = CampaignService.instance;
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findData: Campaign[] = await this.campaignService.findAll();

      res.status(200).json({ status: true, data: findData, message: 'Campaign find successfully!' });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const findData: Campaign = await this.campaignService.findById(id);

      res.status(200).json({ status: true, data: findData, message: 'Campaign find successfully!' });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Campaign = req.body;
      const createData: Campaign = await this.campaignService.create(data);

      res.status(201).json({ status: true, data: createData, message: 'Campaign created successfully!' });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data: Campaign = req.body;
      const updateData: Campaign = await this.campaignService.update(id, data);

      res.status(200).json({ status: true, data: updateData, message: 'Campaign updated successfully!' });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deleteData: Campaign = await this.campaignService.delete(id);

      res.status(200).json({ status: true, data: deleteData, message: 'Campaign deleted successfully!' });
    } catch (error) {
      next(error);
    }
  };

  aiSuggest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, objective, budget } = req.body;
      const prompt = `Suggest the best target audience and budget for a digital ad campaign
                       with objective: ${objective}, name: ${name}, and initial budget: $${budget}. 
                       Please provide: 
                        1. A recommended budget (as a number)
                        2. A detailed target audience description
                        3. A brief reasoning for your suggestions
                        Format your response as a JSON object with keys: suggestedBudget (number),
                        suggestedAudience (string), reasoning (string).`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0].message.content;
      const suggestions = JSON.parse(aiResponse);
      const createData: Campaign = await this.campaignService.create({
        name: suggestions.name,
        objective: suggestions.objective,
        budget: suggestions.budget,
        target_audience: suggestions.target_audience,
        ai_suggestions: suggestions.ai_suggestions,
      });

      res.status(201).json({ status: true, data: createData, message: 'Campaign created successfully!' });
    } catch (error) {
      next(error);
    }
  };
}

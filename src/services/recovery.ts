import { RecoveryMilestone } from '../types';

class RecoveryService {
  getMilestones(): RecoveryMilestone[] {
    return [
      {
        id: '1',
        title: 'First 10 Days',
        description: 'Critical healing period - avoid touching the transplanted area',
        timeframe: 'Days 1-10',
        isCompleted: false,
        tasks: [
          {
            id: '1-1',
            title: 'Take prescribed antibiotics',
            description: 'Take antibiotics as prescribed by your doctor',
            isCompleted: true,
            completedAt: '2024-12-01',
            category: 'medication',
          },
          {
            id: '1-2',
            title: 'Apply healing spray',
            description: 'Spray the transplanted area 3 times daily',
            isCompleted: true,
            completedAt: '2024-12-01',
            category: 'care',
          },
          {
            id: '1-3',
            title: 'Sleep with elevated head',
            description: 'Use extra pillows to keep head elevated',
            isCompleted: false,
            category: 'lifestyle',
          },
          {
            id: '1-4',
            title: 'Avoid direct sun exposure',
            description: 'Wear a hat when going outside',
            isCompleted: false,
            category: 'lifestyle',
          },
        ],
      },
      {
        id: '2',
        title: 'Medication Period',
        description: 'Continue taking prescribed medications for optimal results',
        timeframe: 'Days 11-14',
        isCompleted: false,
        tasks: [
          {
            id: '2-1',
            title: 'Continue antibiotics',
            description: 'Complete the full course of antibiotics',
            isCompleted: false,
            category: 'medication',
          },
          {
            id: '2-2',
            title: 'Start hair growth vitamins',
            description: 'Begin taking biotin and other hair growth supplements',
            isCompleted: false,
            category: 'medication',
          },
          {
            id: '2-3',
            title: 'Gentle hair washing',
            description: 'Start washing hair gently with recommended shampoo',
            isCompleted: false,
            category: 'care',
          },
        ],
      },
      {
        id: '3',
        title: '1 Month Checkup',
        description: 'First follow-up appointment and photo documentation',
        timeframe: 'Month 1',
        isCompleted: false,
        tasks: [
          {
            id: '3-1',
            title: 'Schedule follow-up appointment',
            description: 'Book your 1-month checkup with the doctor',
            isCompleted: false,
            category: 'checkup',
          },
          {
            id: '3-2',
            title: 'Take progress photos',
            description: 'Document your progress with photos',
            isCompleted: false,
            category: 'photo',
          },
          {
            id: '3-3',
            title: 'Discuss any concerns',
            description: 'Prepare questions about your recovery',
            isCompleted: false,
            category: 'checkup',
          },
        ],
      },
      {
        id: '4',
        title: '3 Month Evaluation',
        description: 'Mid-term evaluation of hair growth progress',
        timeframe: 'Month 3',
        isCompleted: false,
        tasks: [
          {
            id: '4-1',
            title: '3-month checkup',
            description: 'Attend your 3-month follow-up appointment',
            isCompleted: false,
            category: 'checkup',
          },
          {
            id: '4-2',
            title: 'Update progress photos',
            description: 'Take new photos to compare with 1-month photos',
            isCompleted: false,
            category: 'photo',
          },
          {
            id: '4-3',
            title: 'Evaluate hair growth',
            description: 'Discuss hair growth progress with your doctor',
            isCompleted: false,
            category: 'checkup',
          },
        ],
      },
      {
        id: '5',
        title: '6 Month Progress',
        description: 'Significant growth should be visible by now',
        timeframe: 'Month 6',
        isCompleted: false,
        tasks: [
          {
            id: '5-1',
            title: '6-month checkup',
            description: 'Attend your 6-month follow-up appointment',
            isCompleted: false,
            category: 'checkup',
          },
          {
            id: '5-2',
            title: 'Document growth progress',
            description: 'Take detailed photos showing hair growth',
            isCompleted: false,
            category: 'photo',
          },
          {
            id: '5-3',
            title: 'Adjust care routine',
            description: 'Update your hair care routine based on progress',
            isCompleted: false,
            category: 'care',
          },
        ],
      },
      {
        id: '6',
        title: '1 Year Final Results',
        description: 'Final evaluation - full results should be visible',
        timeframe: 'Month 12',
        isCompleted: false,
        tasks: [
          {
            id: '6-1',
            title: 'Final checkup',
            description: 'Attend your 1-year final evaluation',
            isCompleted: false,
            category: 'checkup',
          },
          {
            id: '6-2',
            title: 'Final result photos',
            description: 'Take final photos showing complete results',
            isCompleted: false,
            category: 'photo',
          },
          {
            id: '6-3',
            title: 'Long-term care plan',
            description: 'Discuss long-term hair care and maintenance',
            isCompleted: false,
            category: 'checkup',
          },
        ],
      },
    ];
  }
}

export const recoveryService = new RecoveryService();


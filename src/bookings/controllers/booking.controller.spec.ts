import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseService } from '../../core/services/supabase.service';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingsController } from './booking.controller';
import { BookingService } from './booking.service';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingService;

  const mockBookingsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    cancel: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingsService,
        },
        {
          provide: BookingsRepository,
          useValue: {},
        },
        {
          provide: SupabaseService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingService>(BookingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer une réservation', async () => {
      const createBookingDto = {
        screening_id: '123',
        seat_number: 1,
      };
      const userId = 'user123';
      const mockResponse = { id: '1', ...createBookingDto };

      mockBookingsService.create.mockResolvedValue(mockResponse);

      const result = await controller.create(createBookingDto, {
        user: { id: userId },
      });

      expect(result).toEqual(mockResponse);
      expect(mockBookingsService.create).toHaveBeenCalledWith(
        createBookingDto,
        userId,
      );
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les réservations', async () => {
      const userId = 'user123';
      const mockResponse = [{ id: '1' }, { id: '2' }];

      mockBookingsService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.getMyBookings({ user: { id: userId } });

      expect(result).toEqual(mockResponse);
      expect(mockBookingsService.findAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('findOne', () => {
    it('devrait retourner une réservation spécifique', async () => {
      const id = '1';
      const userId = 'user123';
      const mockResponse = { id, screening_id: '123' };

      mockBookingsService.findOne.mockResolvedValue(mockResponse);

      const result = await controller.getBooking(id, { user: { id: userId } });

      expect(result).toEqual(mockResponse);
      expect(mockBookingsService.findOne).toHaveBeenCalledWith(id, userId);
    });
  });

  describe('cancel', () => {
    it('devrait annuler une réservation', async () => {
      const id = '1';
      const userId = 'user123';
      const mockResponse = { id, status: 'cancelled' };

      mockBookingsService.cancel.mockResolvedValue(mockResponse);

      const result = await controller.cancelBooking(id, {
        user: { id: userId },
      });

      expect(result).toEqual(mockResponse);
      expect(mockBookingsService.cancel).toHaveBeenCalledWith(id, userId);
    });
  });
});

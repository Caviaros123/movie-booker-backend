import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseService } from '../../core/services/supabase.service';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingsService } from './bookings.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let repository: BookingsRepository;

  const mockBookingsRepository = {
    create: jest.fn(),
    findByUserId: jest.fn(),
    findOne: jest.fn(),
    findByScreeningAndSeat: jest.fn(),
    findByUserAndScreening: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: BookingsRepository,
          useValue: mockBookingsRepository,
        },
        {
          provide: SupabaseService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    repository = module.get<BookingsRepository>(BookingsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer une réservation', async () => {
      const createBookingDto = {
        screening_id: '123',
        seat_number: 1,
      };
      const userId = 'user123';
      const mockResponse = { id: '1', ...createBookingDto };

      mockBookingsRepository.findByScreeningAndSeat.mockResolvedValue(null);
      mockBookingsRepository.findByUserAndScreening.mockResolvedValue(null);
      mockBookingsRepository.create.mockResolvedValue(mockResponse);

      const result = await service.create(createBookingDto, userId);

      expect(result).toEqual(mockResponse);
      expect(mockBookingsRepository.create).toHaveBeenCalledWith({
        user_id: userId,
        screening_id: createBookingDto.screening_id,
        seat_number: createBookingDto.seat_number,
        status: 'confirmed',
      });
    });

    it('devrait échouer si le siège est déjà réservé', async () => {
      const createBookingDto = {
        screening_id: '123',
        seat_number: 1,
      };
      const userId = 'user123';

      mockBookingsRepository.findByScreeningAndSeat.mockResolvedValue({ id: '1' });

      await expect(service.create(createBookingDto, userId)).rejects.toThrow(
        'Ce siège est déjà réservé',
      );
    });

    it('devrait échouer si l\'utilisateur a déjà une réservation', async () => {
      const createBookingDto = {
        screening_id: '123',
        seat_number: 1,
      };
      const userId = 'user123';

      mockBookingsRepository.findByScreeningAndSeat.mockResolvedValue(null);
      mockBookingsRepository.findByUserAndScreening.mockResolvedValue({ id: '1' });

      await expect(service.create(createBookingDto, userId)).rejects.toThrow(
        'Vous avez déjà une réservation pour cette séance',
      );
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les réservations d\'un utilisateur', async () => {
      const userId = 'user123';
      const mockResponse = [{ id: '1' }, { id: '2' }];

      mockBookingsRepository.findByUserId.mockResolvedValue(mockResponse);

      const result = await service.findAll(userId);

      expect(result).toEqual(mockResponse);
      expect(mockBookingsRepository.findByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('findOne', () => {
    it('devrait retourner une réservation spécifique', async () => {
      const id = '1';
      const userId = 'user123';
      const mockResponse = { id, screening_id: '123' };

      mockBookingsRepository.findOne.mockResolvedValue(mockResponse);

      const result = await service.findOne(id, userId);

      expect(result).toEqual(mockResponse);
      expect(mockBookingsRepository.findOne).toHaveBeenCalledWith(id, userId);
    });
  });

  describe('cancel', () => {
    it('devrait annuler une réservation', async () => {
      const id = '1';
      const userId = 'user123';
      const mockResponse = { id, status: 'cancelled' };

      mockBookingsRepository.findOne.mockResolvedValue({ id });
      mockBookingsRepository.update.mockResolvedValue(mockResponse);

      const result = await service.cancel(id, userId);

      expect(result).toEqual(mockResponse);
      expect(mockBookingsRepository.update).toHaveBeenCalledWith(id, {
        status: 'cancelled',
      });
    });

    it('devrait échouer si la réservation n\'existe pas', async () => {
      const id = '1';
      const userId = 'user123';

      mockBookingsRepository.findOne.mockResolvedValue(null);

      await expect(service.cancel(id, userId)).rejects.toThrow(
        'Réservation non trouvée',
      );
    });
  });
}); 
package edu.utcn.gpstrack.server.position;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Radu Miron
 * @version 1
 */
@Service
public class PositionService {

    @Autowired
    private PositionRepository positionRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Position create(Position position) {
        return positionRepository.save(position);
    }

    public List<Position> getAll() {
        return positionRepository.findAll();
    }

    public Position getById(Integer id){
        return positionRepository.findById(id).get();
    }

    public void delete(Integer id) {
        positionRepository.deleteById(id);
    }

    public List<Position> getBetweenDates(String startDate, String endDate) {
        Calendar startDateMili = Calendar.getInstance();
        Calendar endDateMili = Calendar.getInstance();
        startDateMili.setTimeInMillis(Long.parseLong(startDate));
        endDateMili.setTimeInMillis(Long.parseLong(endDate));
        return positionRepository.findAll()
                .stream()
                .map(element -> {
                    Date currentDate = element.getCreationDate();
                    if (currentDate.after(startDateMili.getTime()) && currentDate.before(endDateMili.getTime())){
                        return element;
                    }
                    return null;
                }).collect(Collectors.toList());
    }

}

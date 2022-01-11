package edu.utcn.gpstrack.server.position;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Radu Miron
 * @version 1
 */
@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/position", method=RequestMethod.POST)
    public Position create(@RequestBody Position position) {
        System.out.println(position);
        return positionService.create(position);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/positions", method=RequestMethod.GET)
    public List<Position> getAll(){
        return positionService.getAll();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/position/{id}", method=RequestMethod.GET)
    public Position getById(@PathVariable("id") Integer id) {
        return positionService.getById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/position/{id}", method=RequestMethod.DELETE)
    public void delete(@PathVariable("id") Integer id) {
        positionService.delete(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/positions/{startDate}/{endDate}", method=RequestMethod.GET)
    public List<Position> getBetweenDates(@PathVariable("startDate") String startDate, @PathVariable("endDate") String endDate){
        return positionService.getBetweenDates(startDate, endDate);
    }
}

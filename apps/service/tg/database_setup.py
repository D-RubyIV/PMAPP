from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

class Person(Base):
    __tablename__ = 'person'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)

class File(Base):
    __tablename__ = 'file'
    id = Column(Integer, primary_key=True)
    data = Column(LargeBinary, nullable=False)
    person_id = Column(Integer, ForeignKey('person.id'))
    person = relationship(Person)

def init_db():
    engine = create_engine('sqlite:///example.db')
    Base.metadata.create_all(engine)
    return engine
